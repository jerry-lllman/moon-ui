import { render } from "@testing-library/react"
import Menu from "../menu"

describe('Menu 容器测试', () => {
	it('Menu 的基本使用', () => {
		const warpper = render(
			<Menu>
				<Menu.Item>1</Menu.Item>
				<Menu.Item>2</Menu.Item>
				<Menu.Item>3</Menu.Item>
			</Menu>
		)
		
	})
})