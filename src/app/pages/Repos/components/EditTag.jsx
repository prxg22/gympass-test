import React, { Component } from 'react'
import Input from '../../../ui-components/Input'
import { Row, Column } from '../../../ui-components/Grid'
import Button from '../../../ui-components/Button'

const validate = (value) => {
    const regex = /[aA-zZ0-9]+(,[aA-zZ0-9]+)*/g
    return regex.test(value)
}

class EditTag extends Component {
    constructor(props) {
        super(props)
        this.tags = props.tags
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tags !== this.tags) this.tags = nextProps.tags
    }

    handleSubmit = (e) => {
        const { onSubmit } = this.props
        e.preventDefault()
        if (onSubmit) onSubmit(this.tags)

        return false
    }

    handleChange(value) {
        const trim = value.replace(' ', '')
        if (!validate(trim)) return
        this.tags = trim.split(',')
        this.forceUpdate()
    }

    render() {
        return (
            <Row style={{ paddingTop: '16px' }}>
                <Column>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <Input
                            name="tags"
                            onChange={e => this.handleChange(e.target.value)}
                            value={this.tags.join(',')}
                        />
                        <Button type="submit">Send</Button>
                    </form>
                </Column>
            </Row>
        )
    }
}

export default EditTag
