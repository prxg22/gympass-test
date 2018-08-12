// libs
import React  from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, text, number, select } from '@storybook/addon-knobs/react'
import { withInfo } from '@storybook/addon-info'

// lib components
import Container from '../Grid/Container'
import Row from '../Grid/Row'
import Column from '../Grid/Column'
import Box from '../Box'
import Icon from '../Icon'

import Collapse from './Collapse'

class Wrapper extends React.Component {
    state = {
        icon: 'angle-right',
        isOpen: false,
    }

    render = () => (
        <div style={{ padding: 16 }}>
            <Box
                style={{
                    padding: '16px 32px',
                    transition: 'all 0.24s ease-in'
                 }}
                status="info"
                shadow={{ blue: 3 }}
            >
                <Collapse
                    isOpen={this.state.isOpen}
                    onOpen={() => this.setState({ isOpen: true, icon: 'angle-down' })}
                    onClose={() => this.setState({ isOpen: false, icon: 'angle-right' })}
                >
                    <Row alignCenter data-collapse-header>
                        <Column cols={{ md: 4 }}>
                            <h4>Propsta 3</h4>
                        </Column>
                        <Column cols={{ md: 3 }}>
                            <div>
                                <h6>24/04/2018</h6>
                            </div>
                        </Column>
                    </Row>
                    <Row style={{ marginTop: 32 }}>
                        <Column>
                            <Box theme="dark" style={{ padding: 16 }}>
                                <Row>
                                    <Column>
                                        <h4>Olá, eu sou o collapse</h4>
                                    </Column>
                                </Row>
                            </Box>
                        </Column>
                    </Row>
                </Collapse>
            </Box>
        </div>
    )
}

storiesOf('Collapse', module)
    .add(
        'events',
        withInfo(
            {
                propTablesExclude: [ Container, Row, Column ]
            }
        )(() => (
            <div>
                <Wrapper />
            </div>

        ))
    )
