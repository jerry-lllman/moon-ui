
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Alert, { AlertType } from './alert'

const TEST_ID = 'test-alert'
const TEST_CLOSE_ICON_ID = 'test-alert-close-icon'

describe('test Alert component', () => {
	it('should render the correct default alert', () => {
		const message = "i am a message"
		const wrapper = render(<Alert message={message} />)
		// 一般应用在想要测试的元素上 getByTestId 方法是 jest 提供的
		// 需要在对应元素上有 data-testid
		const element = wrapper.getByTestId(TEST_ID)
		const textElment = wrapper.getByText(message)
		expect(element).toBeInTheDocument()
		expect(textElment).toBeInTheDocument()

		// 默认是 info
		// expect(element).toHaveClass('alert alert-info-wrapper')
	})

	it('should render the correct type on different props', () => {
		const wrapper = render(<Alert message="success" type={AlertType.Success} />)
		const element = wrapper.getByTestId(TEST_ID)
		expect(element).toHaveClass('alert alert-success-wrapper')

	})

	it('could be closed', () => {
		const onClose = jest.fn()
		const wrapper = render(
			<Alert
				message="closabel"
				closable
				onClose={onClose}
			/>
		)
		const element = wrapper.getByTestId(TEST_ID)
		const closeElement = wrapper.getByTestId(TEST_CLOSE_ICON_ID)
		userEvent.click(closeElement)
		expect(onClose).toHaveBeenCalled()
		expect(element).not.toBeInTheDocument()
	})

	it('support closeIcon', () => {
		const wrapper = render(<Alert closable closeIcon={<span>close</span>} message="" />)

		expect(wrapper.getByText('close')).toBeInTheDocument()
	})

	it('support description', () => {
		// 添加 description 内容
		const wrapper = render(<Alert message="title" description="描述信息" />)
		// 根据 description 内容查找元素
		// 判断 description 内容是否存在元素中
		expect(wrapper.getByText("描述信息")).toBeInTheDocument()

		// 标题应该大一号
		const element = wrapper.getByTestId(TEST_ID)
		expect(element).toHaveClass('alert alert-info-wrapper alert-with-description')
	})

})