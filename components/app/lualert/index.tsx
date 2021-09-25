// eslint-disable react-hooks/exhaustive-deps
// REACT
import React, { useState, useEffect } from 'react'

// ESTILOS
import Styles from './style.module.scss'


// UTILS
import defState, { HOCProps, AlertProps, InternalState } from './utils/models'

// MATERIAL
import Button from '@material-ui/core/Button'

// TEMPLATE
const AlertTemplate: React.FC<HOCProps> = (props) => {
	// ESTADO
	const [state, setState] = useState<InternalState>(defState)


	// SHOW ALERT
	const show = (props: AlertProps | string): void => {
		if (typeof props === 'string')
			setState({
				...defState,
				type: 'alert',
				title: '',
				body: props,
				open: true,
			})
		else {
			setState({
				...defState,
				...props,
				title: props.title,
				body: props.body,
				cancelText: props.cancelText ? props.cancelText : undefined,
				confirmText: props.confirmText ? props.confirmText : undefined,
				open: true,
			})
		}
	}

	// HIDE ALERT
	const hide = (): void => {
		if (state.onCancel) state.onCancel()

		if (!state.fixed) {
			const tmpNested: AlertProps | string | undefined = state.nested
			setState((prevState: InternalState) => {
				if (tmpNested) {
					show(tmpNested)
					return prevState
				} else return { ...prevState, open: false, nested: undefined }
			})

			if (state.resetOnHide && !tmpNested)
				setTimeout(() => {
					setState({ ...defState })
				}, 300)

			if (state.onHide) state.onHide()
		}
	}

	// FORCE TO HIDE
	const forceHide = (): void => {
		setState((prevState: InternalState) => ({ ...prevState, open: false }))
		setTimeout(() => {
			setState({ ...defState })
		}, 300)
	}

	// CONFIRM
	const confirm = (): void => {
		if (state.onConfirm) state.onConfirm()
		hide()
	}

	// GLOBAl
	useEffect(() => {
		window.Alert = show
		window.hideAlert = forceHide
	})

	return (
		<div
			onClick={state.type === 'window' ? hide : undefined}
			className={`${Styles.alertContainer} ${state.open ? Styles.openAlert : Styles.closeAlert}`}
			style={
				state.open
					? {
							backdropFilter: props.blurred ? 'blur(10px)' : 'none',
							zIndex: props.zIndex || state.zIndex || 100,
					  }
					: {
							backdropFilter: props.blurred ? 'blur(10px)' : 'none',
							zIndex: props.zIndex || state.zIndex || 100,
					  }
			}>
			<div
				className={`${Styles.alertContent} ${
					state.open ? Styles.openContent : Styles.closeContent
				}`}
				style={
					state.open
						? {
								maxWidth: state.maxWidth ? state.maxWidth + 'px' : '455px',
								width: state.margins
									? 'calc(100% - ' + state.margins * 2 + 'px)'
									: 'calc(100% - 60px)',
						  }
						: {
								maxWidth: state.maxWidth ? state.maxWidth + 'px' : '455px',
								width: state.margins
									? 'calc(100% - ' + state.margins * 2 + 'px)'
									: 'calc(100% - 60px)',
						  }
				}>
				<div className={Styles.alertBody}>
					{state.type !== 'alert' && state.title.length > 0 && (
						<h1 className={Styles.alertContentH1}>{state.title}</h1>
					)}
					<p
						className={Styles.alertContentP}
						style={{
							fontSize: state.type === 'alert' ? '1.2em' : '1em',
						}}>
						{state.body}
					</p>
					{state.customElements}
				</div>

				{state.type !== 'window' && !state.hideActions && (
					<ul className={Styles.alertActions}>
						{!state.fixed && state.type === 'confirm' && (
							<li>
								{!state.cancelBtn ? (
									<Button onClick={hide} className={Styles.cancelBtn} variant='contained'>
										{state.cancelText || props.cancelText || 'Cancel'}
									</Button>
								) : (
									<div onClick={hide}>{state.cancelBtn}</div>
								)}
							</li>
						)}
						<li>
							{!state.confirmBtn ? (
								<Button
									variant='contained'
									onClick={confirm}
									startIcon={state.confirmIcon}
									className={Styles.alertActionsLiButton}
									style={{
										background:
											state.type === 'error'
												? props.errColor || '#ff5252'
												: props.confirmColor || '#2196f3',
									}}>
									{state.confirmText || props.confirmText || 'Accept'}
								</Button>
							) : (
								<div onClick={confirm}>{state.confirmBtn}</div>
							)}
						</li>
					</ul>
				)}
			</div>
		</div>
	)
}

// DEFAULT
AlertTemplate.defaultProps = {
	confirmColor: '#2196f3',
	confirmText: 'Confirm',
	cancelText: 'Cancel',
	errColor: '#ff5252',
	blurred: false,
	zIndex: 1,
}

export default AlertTemplate