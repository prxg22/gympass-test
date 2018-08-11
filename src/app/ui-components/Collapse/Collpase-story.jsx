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
        icon: 'angle-right'
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
                    onOpen={() => this.setState({ icon: 'angle-down' })}
                    onClose={() => this.setState({ icon: 'angle-right' })}
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
                        <Column cols={{ md: 3 }}>
                            <div>
                                <h6 style={{ color: 'blue' }}>Aguardando</h6>
                            </div>
                        </Column>
                        <Column align="right" cols={{ md: 2 }}>
                            <Icon name={this.state.icon} style={{ color: 'blue' }} />
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
        'default',
        withInfo({
            propTablesExclude: [ Container, Row, Column ]
        })(
            () => {
                return (
                    <div style={{ padding: 16 }}>
                        <Box
                            style={{
                                padding: '16px 32px',
                                transition: 'all 0.24s ease-in'
                             }}
                            status="info"
                            shadow={{ blue: 3 }}
                        >
                            <Collapse>
                                <Row alignCenter data-collapse-header>
                                    <Column cols={{ md: 4 }}>
                                        <h4>Propsta 3</h4>
                                    </Column>
                                    <Column cols={{ md: 3 }}>
                                        <div style={{ color: '#ccc' }}>
                                            <Icon style={{ verticalAlign: 'sub', marginRight: 4 }} name="calendar" />
                                            <span className="caption">Recebido em</span>
                                        </div>
                                        <div>
                                            <h6>24/04/2018</h6>
                                        </div>
                                    </Column>
                                    <Column cols={{ md: 3 }}>
                                        <div style={{ color: '#ccc' }}>
                                            <Icon style={{ verticalAlign: 'sub', marginRight: 4 }} name="calendar" />
                                            <span className="caption">Status</span>
                                        </div>
                                        <div>
                                            <h6 style={{ color: 'blue' }}>Aguardando</h6>
                                        </div>
                                    </Column>
                                    <Column align="right" cols={{ md: 2 }}>
                                        <Icon name="angle-right" style={{ color: 'blue' }} />
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
        )
    )
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
