import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelectors } from 'reselect';

import { selectDirectorySections } from '../../redux/directory/directory.selectors';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss'

const Directory = ({ sections }) => (
        return (
            <div className='directory-menu'>
                {
                    sections.map(({ id, ...otherSectionProps }) => (
                        <MenuItem key={id} {...otherSectionProps} />
                    ))
                }
            </div>
        )
);

const mapStateToProps = createStructuredSelectors({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);