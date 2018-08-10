// libs
import React, { Component } from 'react'
import { storiesOf, forceReRender } from '@storybook/react'
import { withKnobs, boolean, text, number, select } from '@storybook/addon-knobs/react'
import { withInfo } from '@storybook/addon-info'
import { Store, State } from '@sambego/storybook-state'

// lib components
import Container from '../Grid/Container'
import Row from '../Grid/Row'
import Column from '../Grid/Column'
import Button from '../Button'
import Link from '../Link'
import Box from '../Box'

import Modal from './Modal'

const store = new Store({
    isOpen: false,
})

storiesOf('Modal', module)
    .add(
        'default',
        withInfo({
            propTablesExclude: [Container, Row, Column, Button, Link, Box, State],
            text: 'Use attribute data-modal-footer',
        })(() => (
            <Row>
                <Column cols={{ xs: 12 }}>
                    <Button onClick={() => store.set({ isOpen: true })}>
                            Open
                    </Button>
                    <State store={store}>
                        <Modal
                            isOpen={store.get('isOpen')}
                            onClose={() => { store.set({ isOpen: false }) }}
                        >
                            <Row>
                                <Column style={{ textAlign: 'center' }} noGutter />
                                <Column style={{ marginBottom: 32 }} noGutter>
                                    <h6 align="center" style={{ padding: '0 40px' }}>
                                            Olá, eu sou um modal (:
                                    </h6>
                                </Column>
                            </Row>
                            <Row data-modal-footer>
                                <Column align="right" noGutter>
                                    <Link
                                        style={{ marginRight: 8 }}
                                        onClick={() => store.set({ isOpen: false })}
                                    >
                                            Cancelar
                                    </Link>
                                    <Button
                                        onClick={() => store.set({ isOpen: false })}
                                    >
                                            Editar
                                    </Button>
                                </Column>
                            </Row>
                        </Modal>
                    </State>
                </Column>
            </Row>
        )),
    )
