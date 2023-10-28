import './Message.css'


interface MessageProps {
    onboarding: boolean,
    display: boolean

}
export default function Message({onboarding, display}:MessageProps): JSX.Element {
    return (
        <>
        {display && (
            <>
                <h3>{onboarding ? "Opponent's Board" : "Clear the Board!"}</h3>
            </>
        )}
        </>
    )
}
