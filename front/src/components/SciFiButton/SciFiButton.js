import './styles.css';

export function SciFiButton({ children, onClick }) {

    return (
        <button className="btn-wrapper" onClick={onClick}>{children}</button>
    );
}