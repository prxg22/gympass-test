// libs
import React from 'react'
import PropTypes from 'prop-types'

// ui
import { Column, Row } from '../Grid'
import Loader from '../Loader'
import Icon from '../Icon'

// styles
import styles from './CommitsList.styl'

/**
 * renders repository
 * @function
 * @param {Object} props
 *  @param {Array<Repo>} props.repo repo to be rendered
 *  @param {Function} props.onClick if edit button of one repository is click this event is triggered with the repo as attr
 */
const CommitsList = ({ commits }) => {
    if (!commits) return (<Loader />)
    if (!commits.length) return (<p>No commits yet!</p>)
    return (
        <Row className={styles['commit-list']}>
            {commits.map(c => (
                <Column>
                    <span className="caption"><Icon name="file-code" /> {c.sha}</span>
                    <p className="tinny">{c.commit.message}</p>
                </Column>
            ))}
        </Row>
    )
}

CommitsList.propTypes = {
    commits: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default CommitsList
