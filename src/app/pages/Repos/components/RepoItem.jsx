// libs
import React from 'react'
import PropTypes from 'prop-types'

// ui
import { Row } from '../../../ui-components/Grid'
import Box from '../../../ui-components/Box'
import Target from '../../../ui-components/Target'

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
const RepoItem = ({ repo, onClick }) => {
    const { name} = repo
    return (
        <Box
            className={style['repo-item']}
            status="info"
            shadow={{ grey: 2 }}
        >
            <Row alignCenter>
                <div>
                    <h4 className={style['repo-item__title']}>{name}</h4>
                </div>
                <div className={style['repo-item__tags']} >
                </div>
                <div>
                </div>
            </Row>
        </Box>
    )
}

RepoItem.propTypes = {
    repo: RepoPropType.isRequired,
    onClick: PropTypes.func,
}

RepoItem.defaultProps = {
    onClick: null,
}

export default RepoItem
