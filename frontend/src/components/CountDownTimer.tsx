import { useCountdown } from './hooks/CountDown';
import { Badge } from 'react-bootstrap';
import moment from 'moment';

interface CountdownTimerProps {
    targetDateString: string;
    stateChanged?: () => void;
}

const CountdownTimer = ({ targetDateString, stateChanged }: CountdownTimerProps) => {
    const targetDate = moment(targetDateString).toDate();
    const [days, hours, minutes, seconds] = useCountdown(targetDate);

    if (days + hours + minutes + seconds <= 0) {
        if (stateChanged) stateChanged();
        return <Badge bg="secondary">Expired</Badge>;
    } else {
        return (
            <>
            <h5><Badge bg="danger">{minutes}m {seconds}s</Badge></h5>
            </>
        );
    }
};

export default CountdownTimer