// libs
import React, { Component } from 'react'

import Grid from '../src/app/ui-components/Grid'

const StoryComponent = (storyFn) => (
    <Grid.Container style={{ paddingTop: '30px' }}>
        <Grid.Row>
              <Grid.Column noGutter>
                  {storyFn()}
              </Grid.Column>
        </Grid.Row>
    </Grid.Container>
)

export default StoryComponent
