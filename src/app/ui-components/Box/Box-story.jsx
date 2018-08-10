// libs
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, text, number, select } from '@storybook/addon-knobs/react'
import { withInfo } from '@storybook/addon-info'

// lib components
import Container from '../Grid/Container'
import Row from '../Grid/Row'
import Column from '../Grid/Column'

import Box from './Box'

// custom story styles
storiesOf('Box', module)
    .add(
        'default',
        withInfo({
            propTablesExclude: [Container, Row, Column],
        })(() => {
            const groups = {
                style: 'Style',
                theming: 'Type',
            }

            const statusValue = select('Status', {
                '': 'Default',
                info: 'Info',
            }, '', groups.type)

            const noRadiusValue = boolean('No Radius', false, groups.style)
            const noBorderValue = boolean('No Border', false, groups.style)
            const shadowColorValue = text('Shadow Color', '', groups.style)

            const shadowLevelValue = number('Shadow Level', 1, {
                range: true,
                min: 1,
                max: 4,
                step: 1,
            }, groups.style)

            const formatShadow = (color, level) => (color && level ? { [color]: level } : null)

            return (
                <Container>
                    <Row>
                        <Column
                            cols={{ xs: 4 }}
                            offsets={{ xs: 4 }}
                        >
                            <Box
                                style={{ minHeight: 200, textAlign: 'center' }}
                                theme={themeValue}
                                status={statusValue}
                                noRadius={noRadiusValue}
                                noBorder={noBorderValue}
                                shadow={formatShadow(shadowColorValue, shadowLevelValue)}
                                backgroundUrl={backgroundImage ? 'images/bg-product-highlight.png' : ''}
                                disabled={boolean('Disabled', false, groups.style)}
                                backgroundOpacity={backgroundOpacityValue}
                            >
                                <h3>I'm a box!</h3>
                            </Box>
                        </Column>
                    </Row>
                </Container>
            )
        }),
    )
