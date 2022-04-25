import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';

const ProgressBar = ({ second, onFinish, ...props }) => {

    const [ mountedDatetime, setMountedDatetime ] = useState();

    const [ progressDatetime, setProgressDatetime ] = useState();

    const progressMilliSecond = useMemo(() => {
        if (mountedDatetime && progressDatetime) {
            const mountedTimestamp = mountedDatetime.getTime();
            const progressTimestamp = progressDatetime.getTime();
            return progressTimestamp - mountedTimestamp;
        }
        return 0;
    }, [ mountedDatetime, progressDatetime ]);

    const milliSecond = useMemo(() => {
        return second * 1000;
    }, [ second ]);

    const lastMilliSecond = useMemo(() => {
        return progressMilliSecond > milliSecond ? 0 : milliSecond - progressMilliSecond;
    }, [ progressMilliSecond, milliSecond ]);

    const lastSecond = useMemo(() => {
        return Math.ceil(lastMilliSecond / 1000);
    }, [ lastMilliSecond ]);

    const lastProgressBarWidthPercentage = useMemo(() => {
        return lastMilliSecond / milliSecond;
    }, [ milliSecond, lastMilliSecond ]);

    useEffect(() => {
        setMountedDatetime(new Date());
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setProgressDatetime(new Date());
        }, 50);
        return () => {
            clearInterval(intervalId);
        }
    }, []);

    useEffect(() => {
        lastSecond <= 0 && onFinish?.();
    }, [ lastSecond ]);

    return (
        <ProgressBarWithStyled {...props} widthPercentage={ lastProgressBarWidthPercentage }>
            <ProgressBarGaugeWithStyled className={'bar'} />
            <ProgressBarFrameWithStyled className={'frame'} />
            <ProgressBarLabelWithStyled>
                <span>残り{ lastSecond }秒</span>
            </ProgressBarLabelWithStyled>
        </ProgressBarWithStyled>
    )
}

const ProgressBarWithStyled = styled.div`
    position : relative;
    width : 100%;
    height : 40px;

    & > .bar {
        width : ${({ widthPercentage }) => `${ widthPercentage * 100 }%`};
    }
`;

const ProgressBarFrameWithStyled = styled.div`
    border : 6px solid #ccc;
    border-radius : 22px;
    box-sizing : border-box;

    width : 100%;
    height : 100%;
    position : absolute;
`;

const ProgressBarGaugeWithStyled = styled.div`
    background-color : #e6e6fa;
    border-radius : 22px;

    width : 100%;
    height : 100%;
    position : absolute;
`;

const ProgressBarLabelWithStyled = styled.div`
    width : 100%;
    height : 100%;
    position : absolute;
    
    display : flex;
    flex-direction : row;
    justify-content : center;
    align-items : center;
`;

export default ProgressBar;