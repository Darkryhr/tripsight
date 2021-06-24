import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import * as actions from '../actions';
import Thumbnail from './Thumbnail';
import './Dashboard.css';
import { createLoader } from './createLoader';

function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getVacations());
    dispatch(actions.getFollowed());
  }, []);
  const vacations = useSelector((state) => state.vacations);

  const { search } = useSelector((state) => state.search);
  const followed = useSelector((state) => state.follows);
  const order = followed;

  const renderContent = () =>
    vacations.map((vacation) => (
      <Thumbnail
        {...vacation}
        key={vacation.id}
        followed={order.includes(vacation.id)}
      />
    ));

  let sorted;
  let allThumbs = renderContent();
  const renderBySearch = () => {
    return allThumbs.filter((thumb) => {
      if (thumb.props.destination.includes(search)) return thumb;
    });
  };

  if (order) {
    sorted = _.sortBy(allThumbs, function (thumb) {
      return _.indexOf(order.reverse(), +thumb.key);
    }).reverse();
  } else createLoader();

  const createDash = () => {
    return (
      <div className="dashboard">
        <div className="dashboard__container">
          {search ? renderBySearch() : sorted}
        </div>
      </div>
    );
  };

  return !vacations ? createLoader() : createDash();
}

export default Dashboard;
