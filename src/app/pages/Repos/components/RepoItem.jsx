// libs
import React from 'react'
import PropTypes from 'prop-types'

// ui
import { Row } from '../../../ui-components/Grid'
import Box from '../../../ui-components/Box'
import Target from '../../../ui-components/Target'
import Collapse from '../../../ui-components/Collapse'
import Icon from '../../../ui-components/Icon'

// components
import CommitsList from './CommitsList'

// types
import { RepoPropType } from '../../../types'

// style
import style from './RepoItem.styl'

/**
 * renders repository
 * @function
 * @param {Object} props
 *  @param {Array<Repo>} props.repo repo to be rendered
 *  @param {Function} props.onClick if edit button of one repository is click this event is triggered with the repo as attr
 */
const RepoItem = ({ repo, onClose, onOpen, index }) => {
    const {
        name,
        stargazers_count,
        watchers_count,
        forks_count,
        commits,
        isOpen
    } = repo

    return (
        <Box
            className={style['repo-item']}
            status="info"
            shadow={{ grey: 2 }}
        >
            <Collapse
                isOpen={isOpen}
                onClose={() => onClose && onClose(index)}
                onOpen={() => onOpen && onOpen(index)}
            >
                <Row data-collapse-header>
                    <h4 className={style['repo-item__title']}>{name}</h4>
                    <div className={style['repo-item__props']}><Icon name="star" /> <span>{stargazers_count}</span></div>
                    <div className={style['repo-item__props']}><Icon name="eye" /> <span>{watchers_count}</span></div>
                    <div className={style['repo-item__props']}><Icon name="code-branch" /> <span>{forks_count}</span></div>
                </Row>
                <Row>
                    <CommitsList commits={commits} />
                </Row>
            </Collapse>
        </Box>
    )
}

RepoItem.propTypes = {
    index: PropTypes.number.isRequired,
    repo: RepoPropType.isRequired,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
}

RepoItem.defaultProps = {
    onClose: null,
    onOpen: null,
}

export default RepoItem
