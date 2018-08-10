// libs
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, text, number, select } from '@storybook/addon-knobs/react'
import { withInfo } from '@storybook/addon-info'

// lib components
import Container from '../Grid/Container'
import Row from '../Grid/Row'
import Column from '../Grid/Column'

import Tag from './Tag'

storiesOf('Tags', module)
    .add(
        'default',
        withInfo({
            propTablesExclude: [Container, Row, Column],
        })(() => {
            const groups = {
                type: 'Type',
                content: 'Content',
            }

            const typeValue = select('Type', {
                '': 'Default',
                secondary: 'Seconday',
            }, '', groups.type)

            const shapeValue = select('Shape', {
                '': 'Default',
                price: 'Shape Price',
            }, '', groups.type)

            const textContent = text('Content', 'Tag content')

            return (
                <Container>
                    <Row justifyCenter >
                        <Column
                            cols={{ xs: 2 }}
                        >
                            <Tag
                                type={typeValue}
                                large={boolean('Large', false)}
                                shape={shapeValue}
                            >
                                {textContent}
                            </Tag>
                        </Column>
                    </Row>
                </Container>
            )
        }),
    )
