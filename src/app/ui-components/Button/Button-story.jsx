// libs
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, text, number, select } from '@storybook/addon-knobs/react'
import { withInfo } from '@storybook/addon-info'

// lib components
import Container from '../Grid/Container'
import Row from '../Grid/Row'
import Column from '../Grid/Column'
import Box from '../Box'

import Button from './Button'


storiesOf('Button', module)
    .add(
        'default',
        withInfo({
            propTablesExclude: [Container, Row, Column, Box],
        })(() => {
            const groups = {
                style: 'Style',
                icon: 'Icon',
                content: 'Content',
            }

            const kindValue = select('Kind', {
                primary: 'Primary',
                'outline-primary': 'Outline Primary',
            }, 'primary', groups.style)

            const onlyIconValue = boolean('Only Icon', false, groups.icon)

            return (
                <Container>
                    <Row>
                        <Column
                            cols={{ xs: 12 }}
                        >
                            <Box
                                style={{
                                    padding: 16,
                                }}
                                theme={(kindValue === 'inverse' || kindValue === 'outline-inverse') ? 'dark' : ''}
                            >
                                <Button
                                    kind={kindValue}
                                    small={boolean('Small', false, groups.style)}
                                    block={boolean('Block', false, groups.style)}
                                    pill={boolean('Pill', false, groups.style)}
                                    disabled={boolean('Disabled', false, groups.style)}
                                    icon={text('Icon', '', groups.icon)}
                                    iconPosition={select('Icon Position', {
                                        left: 'Left',
                                        right: 'Right',
                                    }, 'left', groups.icon)}
                                    href={text('Href', '', groups.content)}
                                >
                                    {text('Content', 'Button', groups.content)}
                                </Button>
                            </Box>
                        </Column>
                    </Row>
                </Container>
            )
        }),
    )
