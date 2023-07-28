import { __ } from '@wordpress/i18n';
import { useState, useEffect, useMemo, forwardRef, cloneElement } from '@wordpress/element';
import { dispatch } from '@wordpress/data';
import { useFloating, autoUpdate } from '@floating-ui/react-dom';
import { v4 as uuid } from 'uuid';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

/**
 * Create Tests Array
 *
 * @description create a sanitized tests array.
 *
 * @param {boolean|string} required Field validation required prop.
 * @param {boolean|Array} validate Field validation validate prop.
 *
 * @returns {Array}
 */
const createTestsArray = (required, validate) => {
	const tests = [];

	if (required) {
		const fn = (str) => typeof str === 'string' && str !== '';
		const res = typeof required === 'string' ? required : __('Required', '10up-block-components');
		tests.push([fn, res]);
	}

	if (validate && Array.isArray(validate)) {
		const isNested = (arr) => Array.isArray(arr) && arr.some((item) => Array.isArray(item));
		const sanitized = isNested(validate) ? validate : [validate];
		sanitized.map((entry) => tests.push(entry));
	}

	return tests;
};

/**
 * Validate Tests Array
 *
 * @description test a value against the tests array.
 *
 * @param {string} value Field value.
 * @param {Array} tests Tests array created from required and validate.
 *
 * @returns {boolean} responses
 */
const validateTestsArray = (value, tests) => {
	const responses = [];

	tests.forEach((entry) => {
		if (!Array.isArray(entry)) {
			return;
		}

		const [test, res] = entry;
		const passes = test(value);

		if (passes === false) {
			responses.push(res);
		}
	});

	return responses;
};

/**
 * Error Message
 *
 * @description style the validation error message.
 *
 * @returns <ErrorMessage />
 */
const ErrorResponse = styled('div')`
	--color-warning: #f00;

	color: var(--color-warning);
`;

/**
 * Error
 *
 * @description display validation error.
 *
 * @returns <Error />
 */
const Error = forwardRef((props, ref) => {
	const { responses } = props;

	return (
		<ErrorResponse className="tenup--block-components__validation-error__response" {...props} ref={ref}>
			{responses.map((response) => (
				<div key={uuid()} className="tenup--block-components__validation-error__response-rule">
					{response}
				</div>
			))}
		</ErrorResponse>
	);
});

/**
 * Field Validation
 *
 * @description create new component which adds field validation abilities.
 *
 * @param {object} props Component props.
 * @param {string} props.value Field validation value.
 * @param {boolean|string} props.required Field validation required prop.
 * @param {boolean|Array} props.validate Field validation validate array prop.
 * @param {*} props.children Child components.
 *
 * @returns {HTMLElement} <FieldValidation />
 */
const FieldValidation = (props) => {
	const { value, required = false, validate = false, children } = props;

	const tests = useMemo(() => createTestsArray(required, validate), [required, validate]);

	const { x, y, reference, floating, strategy } = useFloating({
		placement: 'bottom-start',
		strategy: 'fixed',
		whileElementsMounted: autoUpdate,
	});

	const [responses, setResponses] = useState(true);
	const [lockId, setLockId] = useState(null);

	if (lockId === null) {
		setLockId(uuid());
	}

	const validateTests = useMemo(
		() => (value) => {
			const test = value === '' && required ? [tests[0]] : tests;
			return validateTestsArray(value, test);
		},
		[required, tests],
	);

	const dispatchLock = useMemo(
		() => (state) => {
			if (state) {
				dispatch('core/editor').lockPostSaving(lockId);
			} else {
				dispatch('core/editor').unlockPostSaving(lockId);
			}
		},
		[lockId],
	);

	useEffect(() => {
		setResponses(validateTests(value));
	}, [value, validateTests]);

	useEffect(() => {
		dispatchLock(responses.length > 0);
	}, [responses, dispatchLock]);

	const fieldErorrClassName = responses.length > 0 ? 'tenup--block-components__validation-error__field' : '';

	return (
		<>
			{cloneElement(children, {
				ref: reference,
				...children.props,
				className: classnames(children.props?.className, fieldErorrClassName),
			})}

			{responses.length > 0 && (
				<Error
					ref={floating}
					responses={responses}
					style={{
						position: strategy,
						top: y ?? 0,
						left: x ?? 0,
					}}
				/>
			)}
		</>
	);
};

export { FieldValidation };

FieldValidation.defaultProps = {
	required: false,
	validate: false,
};

FieldValidation.propTypes = {
	value: PropTypes.string.isRequired,
	required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	validate: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
	children: PropTypes.node.isRequired,
};
