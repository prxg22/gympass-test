// libs
import React from 'react'
import PropTypes from 'prop-types'

// ui
import { Row, Column } from '../../../ui-components/Grid'

// types
import { RepoPropType } from '../../../types'

// components
import RepoItem from './RepoItem'

// style
import style from './RepoList.styl'

/**
 * renders repository list
 * @function
 * @param {Object} props
 *  @param {Array<Repo>} props.repos repos to be rendered
 *  @param {Function} props.onClick if edit button of one repository is click this event is triggered with the repo as attr
 */
const ReposList = ({ repos, onOpen, onClose }) => (
    <Row className={style['repo-list']} justifyCenter>
        {repos.map((repo, index) => (
            <Column cols={{ xs: 10 }}>
                <RepoItem
                    index={index}
                    repo={repo}
                    onOpen={(index) => onOpen && onOpen(index)}
                    onClose={(index) => onClose && onClose(index)}
                />
            </Column>
        ))}
    </Row>
)

ReposList.propTypes = {
    repos: PropTypes.arrayOf(RepoPropType).isRequired,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
}

ReposList.defaultProps = {
    onOpen: null,
    onClose: null,
}

export default ReposList
