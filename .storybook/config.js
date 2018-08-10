import { configure, addDecorator } from '@storybook/react'
import { configureViewport } from '@storybook/addon-viewport'
import { withKnobs } from '@storybook/addon-knobs/react'
import { setDefaults } from '@storybook/addon-info'

import StorybookComponent from './StorybookComponent.jsx'

const requireAll = (requireContext) =>  requireContext.keys().map(requireContext)

addDecorator(withKnobs)
addDecorator(StorybookComponent)

setDefaults({
    inline: true,
    header: true,
})

const loadStories = () => {
  requireAll(require.context('../src/app/ui-components', true, /-story\.jsx?$/))
}

configure(loadStories, module)
