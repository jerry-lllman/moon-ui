import classNames from "classnames"
import React from "react"
import Item from "./MenuItem"

type MenuMode = ' horizontal' | 'vertical'

interface MenuProps {
	defaultIndex?: number
	className?: string
	mode?: MenuMode
	style?: React.CSSProperties
	onSelect?: (index: number) => void
	children?: JSX.Element | JSX.Element[]
}

const MenuContext = React.createContext(null)

const Menu = (props: MenuProps) => {

	const { className, mode, style, children = [], defaultIndex = 0, onSelect } = props

	const classes = classNames('menu', className, {
		'menu-vertical': mode === 'vertical'

	})

	let index = 0
	const items = React.Children.map(children, child => {
		if (child.type.displayName === 'MenuItem') {
			return React.cloneElement(child, { ...child.props, index: index++ }, child.props.children)
		} else {
			return null
		}
	})

	return (
		<ul className={classes} style={style}>
			{items}
		</ul>
	)
}

Menu.Item = Item

export default Menu
