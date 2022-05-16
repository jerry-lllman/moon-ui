import classNames from "classnames"
import React, { useState } from "react"
import CloseOutlined from "../../icons/CloseOutlined"

export enum AlertType {
	Success = 'success',
	Info = 'info',
	Warning = 'warning',
	Error = 'error'
}

interface AlertProps {
	message: React.ReactNode,
	type?: AlertType
	closable?: boolean
	closeIcon?: React.ReactNode
	onClose?: React.MouseEventHandler<HTMLButtonElement>,
	description?: React.ReactNode
}

function Alert(props: AlertProps) {
	const { message,
		type = AlertType.Info,
		closable = false,
		closeIcon = <CloseOutlined />,
		description
	} = props

	const [closed, setClosed] = useState(false)

	const prefixCls = `alert-${type}`

	const classes = classNames('alert', {
		[`${prefixCls}-wrapper`]: type,
		['alert-with-description']: description
	})

	const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
		setClosed(true)
		props.onClose?.(e)
	}

	if (closed) return null

	return (
		<div className={classes} data-testid="test-alert">
			
			<div className="alert-content">
				<div className="alert-message">{message}</div>
				{description && <div className="alert-description">{description}</div>}
			</div>

			{
				closable && (
					<button
						type="button"
						data-testid="test-alert-close-icon"
						className="alert-close-icon"
						onClick={handleClose}
						tabIndex={0}
					>
						<span
							className="alert-close-text"
						>
							{closeIcon}
						</span>
					</button>
				)
			}
		</div>
	)
}

export default Alert