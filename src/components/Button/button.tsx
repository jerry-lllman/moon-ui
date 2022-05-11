import classNames from "classnames";
import { createRef, forwardRef } from "react";
import LoadingOutlined from "../../icons/loadingOutlined/index";

export enum ButtonSize {
	Large = 'large',
	Medium = 'medium',
	Small = 'small'
}

export enum ButtonType {
	Primary = 'primary',
	Default = 'default',
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
	danger?: boolean;
	size?: ButtonSize;
	btnType?: ButtonType;
	// shape?: ButtonShape;
	href?: string;
	children?: React.ReactNode;
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
// Partial 将传入参数可选化， ButtonProps 内的属性都变成了可选项了
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const InternalButton: React.ForwardRefRenderFunction<unknown, ButtonProps> = (props, ref) => {
	const {
		className = '',
		disabled = false,
		loading = false,
		danger = false,
		size,
		btnType = ButtonType.Default,
		// shape,
		href,
		children,
		...restProps
	} = props

	const buttonRef = (ref as any) || createRef<HTMLElement>()

	// 默认先添加一个btn类
	// const classes = classNames('btn')

	// 接着根据不同的条件添加不同的类
	const classes = classNames('btn', className, {
		[`btn-${btnType}`]: btnType,
		[`btn-${size}`]: size,
		// [`btn-${shape}`]: shape,
		'btn-danger': danger,
		'btn-loading': loading,
		// 类型为链接时需要特殊添加disabled样式，按钮是元素本身就存在这个属性的
		'btn-disabled': btnType === ButtonType.Link && disabled,
	})

	// 针对 link 类型的按钮进行特殊处理
	if (btnType === ButtonType.Link) {
		return (
			<a href={href} className={classes} {...restProps} >
				{children}
			</a>
		)
	}

	return (
		<button
			className={classes}
			disabled={disabled}
			ref={buttonRef}
			{...restProps}
		>
			{
				loading && (
					<span className="btn-loading-icon">
						<LoadingOutlined />
					</span>
				)
			}
			<span>{children}</span>
		</button>
	)
}
const Button = forwardRef(InternalButton)

Button.displayName = 'Button'

export default Button