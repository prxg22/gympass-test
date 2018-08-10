import React from 'react'
import Tag from '../../../ui-components/Tag'

const TagGroup = ({ tags }) => {
    if (!tags || !Array.isArray(tags) || tags.length < 1) return null

    return tags.map(tag => <Tag>{tag}</Tag>)
}

export default TagGroup
