import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Item from "../MenuItem"

const TEST_ID = 'test-menu-item'

describe('测试 Menu Item ', () => {
	it('menu item 的基本渲染', () => {
		const warpper = render(
			<Item>
				我是内容
			</Item>
		)
		const element = warpper.getByTestId(TEST_ID)
		expect(element).toBeInTheDocument()
		expect(warpper.getByText('我是内容')).toBeInTheDocument()
	})

	it('menu item 支持点击事件', () => {
		const onClick = jest.fn()
		const warpper = render(
			<Item onClick={onClick}>xxxx</Item>
		)
		userEvent.click(warpper.getByTestId(TEST_ID))
		expect(onClick).toBeCalled()
	})

	it('menu item 设置属性', () => {
		const onClick = jest.fn()
		// 设置 disabled
		const warpper = render(
			<Item disabled onClick={onClick}>内容</Item>
		)
		const element = warpper.getByTestId(TEST_ID)
		// 期望带有 disabled 的样式
		expect(element).toHaveClass('menu-item menu-item-disabled')
		// 行为： 触发点击事件
		userEvent.click(element)
		// 期望：事件未被触发
		expect(onClick).not.toBeCalled()
	})
})

