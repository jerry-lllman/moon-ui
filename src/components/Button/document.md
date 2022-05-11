# Button

## Button 组件需求分析

### 列出 Button 可能需要的一些参数 
1. 类型 Type
	- Primary
	- Ghost
	- Dashed
	- Link
	- Text
	- Default

2. 大小 Size
 - Large
 - Medium
 - Small

3. 状态
 - Disabled
 - Loading

4. 形状 Shape
 - Default
 - Circle
 - Round


### 一般 Button 组件的使用
```jsx
	<Button
		size="large"
		type="primary"
		disabled
		href=""?
		className=""?
		autoFocus=""?
		loading=""?
		...
	>
		Button Text
	</Button>	
```

## 代码编写

### 基本类型及参数确定

首先我先根据前面的需求分析确定我们的 Button 组件需要有哪些状态 或类型 等，将其以代码的形式表现出来

```tsx
	// src/components/Button/button.tsx
	export enum ButtonSize {
		Large = 'large',
		Medium = 'medium',
		Small = 'small'
	}

	export enum ButtonType {
		Primary = 'primary',
		Default = 'default',
		Danger = 'danger',
		Link = 'link',
		Dashed = 'dashed',
		Text = 'text'
	}

	export enum ButtonShape {
		Round = 'round',
		Circle = 'circle',
		Default = 'default'
	}

	interface BaseButtonProps {
		className?: string;
		disabled?: boolean;
		loading?: boolean;
		size?: ButtonSize;
		type?: ButtonType;
		shape?: ButtonShape;
		href?: string;
		children?: React.ReactNode;
	}

```

### 针对 Button 组件进行编码

根据上面的props，先将其展开，然后进行使用。其实大多数都是针对于不同的状态给不同的样式（加 class），那么为了更好的处理这种情况，安装一下 classnames 这个库。

```bash
	yarn add classnames @types/classnames
```

另外再对 LinkButton 进行一下特殊处理成 a 标签，基本上一个的大体Button按钮就出来了
```tsx
	// src/components/Button/button.tsx
	// ......

	const Button: React.FC<BaseButtonProps> = (props) => {
		const {
			className,
			disabled,
			loading,
			size,
			type,
			shape,
			href,
			children
		} = props

		// btn 是固定的 class
		const classes = classNames('btn', {
			[`btn-${type}`]: type,
			[`btn-${size}`]: size,
			[`btn-${shape}`]: shape,
			'loading': loading,
			'disabled': type === ButtonType.Link && disabled, // 类型为链接时需要特殊添加disabled样式，按钮是元素本身就存在这个属性的
		})


		// 针对 link 类型的按钮进行特殊处理
		if (type === ButtonType.Link && href) {
			return (
				<a href={href} className={classes}>
					{children}
				</a>
			)
		}

		return (
			<button
				className={classes}
				disabled={disabled}
			>
				{children}
			</button>
	}

	// 添加上默认属性
	Button.defaultProps = {
		disabled: false,
		loading: false,
		type: ButtonType.Default,
	}


	export default Button
```

接着我们来测试一下是否根据我们所想的那样，给不同的参数添加不通的 class 或 设置成 link 是 展现的是 a 标签

```tsx
	// src/App.tsx

	import Button from "./components/Button/button";

	function App() {
		return (
			<div className="App">
				<Button>Defalut</Button>
				<Button disabled>Disabled</Button>
				<Button type={ButtonType.Primary}>Primary</Button>
				<Button type={ButtonType.Link} href="https://www.google.com">Link</Button>
				<Button type={ButtonType.Link} href="https://www.google.com" disabled>Link Disabled</Button> 
				<Button type={ButtonType.Dashed}>Dashed</Button>
				<Button type={ButtonType.Danger}>Danger</Button>
				<Button type={ButtonType.Text}>Text</Button>
				<Button size={ButtonSize.Large}>Large</Button>
				<Button size={ButtonSize.Medium}>Medium</Button>
				<Button size={ButtonSize.Small}>Small</Button>
				<Button shape={ButtonShape.Circle}>Circle</Button>
				<Button shape={ButtonShape.Round}>Round</Button>
			</div>
		);
	}

	export default App;
```

### 初步展现效果
// 图片

