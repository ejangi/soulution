import React, { useEffect, useState } from 'react';

function ErrorModal(props) {
    const [error, setError] = useState(null);
    const name = props.name ? props.name : 'errorModal';

    useEffect(() => {
        setError(props.error);
    }, [props]);



    function close() {
        setError(null);
    }


    return(
        <div className="modal error" id={name} tabIndex="-1" role="dialog" aria-hidden={error !== null ? false : true}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>An error occured</h2>
                        <button type="button" className="btn btn-close" onClick={close}>&#215;</button>
                    </div>
                    <div className="modal-body">
                        <h3>{error?.name}</h3>
                        <p>{error?.message}</p>
                        {error?.description &&
                        <p>{error.description}</p>
                        }
                        {error?.stack &&
                        <pre><code>{error.stack}</code></pre>
                        }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={close}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ErrorModal;