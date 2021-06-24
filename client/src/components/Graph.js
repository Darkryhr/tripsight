import React, { useEffect } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { createLoader } from './createLoader';
import * as actions from '../actions';
import './Graph.css';

function Graph() {
  const dispatch = useDispatch();
  const vacations = useSelector((state) => state.vacations);
  const followed = useSelector((state) => state.follows);
  useEffect(() => {
    dispatch(actions.getVacations());
    dispatch(actions.allFollows());
  }, []);

  const activateGraph = () => {
    const [follows] = followed;
    const victoryData = vacations.map((vacation) => vacation.destination);
    console.log(victoryData);
    const finalData = victoryData
      .map((vacation, index) => {
        console.log(follows[index]);
        return follows[index]
          ? { vacation: vacation, followers: follows[index] }
          : '';
      })
      .filter((data) => data);
    console.log(finalData);
    return (
      <div className="victory__container">
        <VictoryChart
          domainPadding={20}
          theme={VictoryTheme.material}
          width={600}
          padding={{ top: 50, bottom: 50, right: 0, left: 50 }}
        >
          <VictoryAxis
            tickFormat={victoryData}
            style={{ tickLabels: { angle: 45 } }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => (x % 1 === 0 ? `${x} Followers` : '')}
          />
          <VictoryBar
            data={finalData}
            x="vacation"
            y="followers"
            style={{
              data: {
                fill: ({ y }) =>
                  y > 49 ? '#FBC530' : y > 39 ? '#FBC530' : '#FBC530',
              },
            }}
          />
        </VictoryChart>
      </div>
    );
  };

  // const createLoader = () => {
  //   return (
  //     <div className="loading">
  //       <div className="lds-ring">
  //         <div></div>
  //       </div>
  //     </div>
  //   );
  // };
  return (
    <>
      {
        !followed.length ? createLoader() : activateGraph()
        // <div className="victory__container">
        //   <VictoryChart
        //     domainPadding={20}
        //     theme={VictoryTheme.material}
        //     width={600}
        //     padding={{ top: 50, bottom: 50, right: 0, left: 50 }}
        //   >
        //     <VictoryAxis
        //       tickFormat={victoryData}
        //       style={{ tickLabels: { angle: 45 } }}
        //     />
        //     <VictoryAxis
        //       dependentAxis
        //       tickFormat={(x) => (x % 1 === 0 ? `${x} Followers` : '')}
        //     />
        //     <VictoryBar data={finalData} x="vacation" y="followers" />
        //   </VictoryChart>
        // </div>
      }
    </>
  );
}

export default Graph;
