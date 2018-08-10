// libs
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, object } from '@storybook/addon-knobs/react'
import { withInfo } from '@storybook/addon-info'

// lib components
import Container from './Container'
import Row from './Row'
import Column from './Column'

import Box from '../Box'

storiesOf('Grid', module)
    .add(
        'Rows',
        withInfo()(() => {
            const responsiveModifierValue = value => (value === 'true') || value.split(',')
            const groups = {
                align: 'Alignment',
                justify: 'Justify',
                direction: 'Direction',
                fluid: 'Fluid',
            }
            const reverseValue = responsiveModifierValue
            const alignTopValue = responsiveModifierValue
            const alignBottomValue = responsiveModifierValue
            const alignCenterValue = responsiveModifierValue
            const alignStretchValue = responsiveModifierValue
            const justifyStartValue = responsiveModifierValue
            const justifyCenterValue = responsiveModifierValue
            const justifyEndValue = responsiveModifierValue
            const fluidValue = responsiveModifierValue

            return (
                <Container>
                    <Row
                        alignTop={alignTopValue(text('Align Top', '', groups.align))}
                        alignBottom={alignBottomValue(text('Align Bottom', '', groups.align))}
                        alignCenter={alignCenterValue(text('Align Center', '', groups.align))}
                        alignStretch={alignStretchValue(text('Align Stretch', '', groups.align))}
                        justifyStart={justifyStartValue(text('Justify Start', '', groups.justify))}
                        justifyCenter={justifyCenterValue(text('Justify Center', '', groups.justify))}
                        justifyEnd={alignStretchValue(text('Justify End', '', groups.justify))}
                        reverse={reverseValue(text('Reverse', '', groups.direction))}
                        fluid={fluidValue(text('Fluid', '', groups.fluid))}

                    >
                        <Column cols={{ xs: 4 }}>
                            <Box style={{
                                marginBottom: '8px',
                                padding: '16px',
                                height: '100px',
                            }}
                            >0
                            </Box>
                        </Column>
                        <Column cols={{ xs: 4 }}>
                            <Box style={{
                                marginBottom: '8px',
                                padding: '16px',
                                height: '100px',
                            }}
                            >2
                            </Box>
                        </Column>
                        <Column cols={{ xs: 4 }}>
                            <Box style={{
                                marginBottom: '8px',
                                padding: '16px',
                                height: '100px',
                            }}
                            >3
                            </Box>
                        </Column>
                        <Column cols={{ xs: 4 }}>
                            <Box style={{
                                marginBottom: '8px',
                                padding: '16px',
                                height: '100px',
                            }}
                            >4
                            </Box>
                        </Column>
                        <Column cols={{ xs: 4 }}>
                            <Box style={{
                                marginBottom: '8px',
                                padding: '16px',
                                height: '100px',
                            }}
                            >5
                            </Box>
                        </Column>
                    </Row>
                </Container>
            )
        }),
    )
    .add(
        'Columns',
        withInfo()(() => {
            const responsiveModifierValue = value => (value === 'true') || value.split(',')
            const breakpoints = {
                xs: 0,
                sm: 0,
                md: 0,
                lg: 0,
                xl: 0,
                hd: 0,
            }

            const groups = {
                size: 'Size',
                alignment: 'Alignment',
                misc: 'Misc',
            }

            const alignTopValue = responsiveModifierValue
            const alignBottomValue = responsiveModifierValue
            const alignCenterValue = responsiveModifierValue
            const alignStretchValue = responsiveModifierValue

            const hiddenValue = responsiveModifierValue
            const noGutterValue = responsiveModifierValue

            const offsetValue = object('Offsets', breakpoints, groups.size)
            const colValue = object('Cols', { ...breakpoints, xs: 6 }, groups.size)


            return (
                <Container>
                    <Row>
                        <Column
                            cols={colValue}
                            alignTop={alignTopValue(text('Align Top', '', groups.alignment))}
                            alignCenter={alignCenterValue(text('Align Center', '', groups.alignment))}
                            alignBottom={alignBottomValue(text('Align Bottom', '', groups.alignment))}
                            alignStretch={alignStretchValue(text('Align Stretch', '', groups.alignment))}
                            hidden={alignStretchValue(text('Hidden', '', groups.misc))}
                            noGutter={alignStretchValue(text('No-gutter', '', groups.misc))}
                        >

                            <Box style={{
                                marginBottom: '8px',
                                padding: '16px',
                            }}
                            >cols: {Object.entries(colValue)}
                            </Box>
                        </Column>
                        <Column
                            cols={{ xs: 6 }}
                            offsets={offsetValue}
                            noGutter={alignStretchValue(text('No-gutter', '', groups.misc))}
                        >

                            <Box style={{
                                marginBottom: '8px',
                                padding: '16px',
                            }}
                            >offset: {Object.entries(offsetValue)}
                            </Box>
                        </Column>
                    </Row>
                </Container>
            )
        }),
    )
