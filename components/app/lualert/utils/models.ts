// ALERT PROPS
export interface AlertProps {
	type: 'confirm' | 'window' | 'alert' | 'error'
	customElements?: JSX.Element
	nested?: AlertProps | string
	confirmIcon?: JSX.Element
	confirmBtn?: JSX.Element
	cancelBtn?: JSX.Element
	onConfirm?: () => unknown
	hideActions?: boolean
	resetOnHide?: boolean
	confirmText?: string
	onCancel?: () => unknown
	cancelText?: string
	onHide?: () => unknown
	maxWidth?: number
	margins?: number
	fixed?: boolean
	zIndex?: number
	title: string
	body: string
}

// HOC PROPS
export interface HOCProps {
	confirmColor?: string
	confirmText?: string
	cancelText?: string
	errColor?: string
	blurred?: boolean
	zIndex?: number
}

// ALERT STATE
export interface InternalState extends AlertProps {
	open: boolean
}

// DEFAULT STATE
const defState: InternalState = {
	customElements: undefined,
	confirmText: undefined,
	cancelText: undefined,
	confirmBtn: undefined,
	onConfirm: undefined,
	cancelBtn: undefined,
	maxWidth: undefined,
	onCancel: undefined,
	hideActions: false,
	resetOnHide: false,
	margins: undefined,
	zIndex: undefined,
	onHide: undefined,
	fixed: undefined,
	type: 'alert',
	open: false,
	title: '',
	body: '',
}

export default defState