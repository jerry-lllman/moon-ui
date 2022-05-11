import { fireEvent, render } from '@testing-library/react'
import { ReactNode } from 'react'

import Button, { ButtonProps, ButtonSize, ButtonType } from './button'

// 小试牛刀一下
// test('our first react test case', () => {
// 	const wrapper = render(<Button>i am a button</Button>)
// 	const element = wrapper.queryByText('i am a button')
// 	expect(element).toBeTruthy()
// 	expect(element).toBeInTheDocument()
// })

const defaultProps = {
	onClick: jest.fn() // jest 提供的监控事件
}

const testProps: ButtonProps = {
	btnType: ButtonType.Primary,
	size: ButtonSize.Small,
	className: 'test-class-name'
}

function getRenderButtonElement(child: ReactNode, props: ButtonProps = {},) {
	const { container } = render(<Button {...props}>{child}</Button>)
	return container.firstElementChild
}

describe('test Button component', () => {
	it('should render the correct default button', () => {
		const element = getRenderButtonElement('default', defaultProps)
		expect(element).toBeInTheDocument()

		if (element) {
			expect(element.tagName).toEqual('BUTTON')
			expect(element).toHaveClass('btn btn-default')

			fireEvent.click(element) // jest 提供的触发事件 fireEvent
			expect(defaultProps.onClick).toHaveBeenCalled()
		}
	})
	it('should render the correct component based on different props', () => {
		const element = getRenderButtonElement('different props', testProps)
		expect(element).toBeInTheDocument()

		expect(element).toHaveClass('btn btn-primary btn-small test-class-name')
	})

	it('should render the correct component when danger set to true', () => {
		const element = getRenderButtonElement('danger', { danger: true })
		expect(element).toBeInTheDocument()

		expect(element).toHaveClass('btn btn-danger')
	})

	it('should render the correct component when danger set to true and btnType equals primary', () => {
		const element = getRenderButtonElement('primary danger', { danger: true, btnType: ButtonType.Primary })
		expect(element).toBeInTheDocument()

		expect(element).toHaveClass('btn btn-danger btn-primary')
	})

	it('should render a link when btnType equals link and href provided', () => {
		const element = getRenderButtonElement('link', { btnType: ButtonType.Link, href: 'www.google.com' })
		expect(element).toBeInTheDocument()

		expect(element?.tagName).toEqual('A')
		expect(element).toHaveClass('btn btn-link')
		expect(element?.getAttribute('href')).toBe('www.google.com')

	})

	it('should render disabled button when disabled set to true', () => {
		const element = getRenderButtonElement('disabled', { disabled: true, ...defaultProps }) as HTMLButtonElement
		expect(element).toBeInTheDocument()
		expect(element?.getAttribute('disabled'))
		expect(element.disabled).toBeTruthy()

		fireEvent.click(element)
		expect(defaultProps.onClick).not.toHaveBeenCalled()


		const element1 = getRenderButtonElement('disabled link', { btnType: ButtonType.Link, disabled: true }) as HTMLAnchorElement
		expect(element1).toBeInTheDocument()
		expect(element1).toHaveClass('btn btn-link btn-disabled')

		fireEvent.click(element1)
		expect(defaultProps.onClick).not.toHaveBeenCalled()
	})

	it('should render loading button when loading set to true', () => {
		const element = getRenderButtonElement('disabled', { loading: true })
		expect(element).toBeInTheDocument()
		expect(element).toBeInTheDocument()
		expect(element?.firstElementChild).toHaveClass('btn-loading-icon')
	})

})