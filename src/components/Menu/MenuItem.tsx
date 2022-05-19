import classNames from "classnames"

interface BaseItemProps {
	index?: number
	disabled?: boolean
	className?: string
	style?: React.CSSProperties
	children?: React.ReactNode
	key?: string
}

type MenuItemProps = BaseItemProps & React.LiHTMLAttributes<HTMLElement>

function Item(props: MenuItemProps) {
	const { index, disabled, className, style, children, onClick, ...rest } = props

	const classes = classNames('menu-item', className, {
		'menu-item-disabled': disabled
	})

	const clickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
		if (disabled) return
		onClick?.(e)
	}

	return (
		<li data-testid="test-menu-item" className={classes} style={style} onClick={clickHandler} {...rest}>
			{children}
		</li>
	)
}

Item.displayName = 'MenuItem'

export default Item