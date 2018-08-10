import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Row, Column } from '../Grid'
import Box from '../Box'

import style from './Loader.styl'

const Loader = ({ className, ...others }) => (
    <Row justifyCenter alignCenter>
        <Column cols={{ xs: 12, xl: 6 }}>
            <Box
                style={{ padding: '16px' }}
                shadow={{ grey: 2 }}
                noRadius
            >
                <Row justifyCenter alignCenter>
                    <div
                        className={classnames(className, style.loader)}
                        {...others}
                    />
                </Row>
            </Box>
        </Column>
    </Row>
)

Loader.propTypes = {
    className: PropTypes.string,
}

Loader.defaultProps = {
    className: '',
}

export default Loader
