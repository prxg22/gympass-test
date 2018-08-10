import React from 'react'
import PropTypes from 'prop-types'

import { Row, Column } from '../../../ui-components/Grid'
import Box from '../../../ui-components/Box'
import Input from '../../../ui-components/Input'
import Button from '../../../ui-components/Button'

import style from './UserBox.styl'

const UserBox = (props) => {
    const {
        onSubmit,
        onChange,
        errorMsg,
    } = props

    const submit = (e) => {
        e.preventDefault()
        if (onSubmit) onSubmit(e)
        return false
    }

    return (
        <div className={style['user-box']}>
            <Row justifyCenter alignCenter>
                <Column cols={{ xs: 12, xl: 6 }}>
                    <Box
                        className={style[['user-box__container']]}
                        shadow={{ grey: 2 }}
                        noRadius
                    >
                        <Row justifyCenter alignCenter>
                            <form onSubmit={e => submit(e)} >
                                <h4 className={style['user-box__label']}>https://github.com/</h4>
                                <Input
                                    className={style['user-box__input']}
                                    onChange={e => e.preventDefault() || onChange(e.target.value)}
                                    name="usename"
                                    placeholder="octocat"
                                    required
                                    errorMsg={errorMsg}
                                />
                                <Button type="submit" small>
                                    Enviar
                                </Button>
                            </form>
                        </Row>
                    </Box>
                </Column>
            </Row>
        </div>
    )
}

UserBox.propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    errorMsg: PropTypes.string,
}

UserBox.defaultProps = {
    onSubmit: null,
    onChange: null,
    errorMsg: '',
}

export default UserBox
