import React, {useContext} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {Button, Container, Grid} from '@material-ui/core';
import {TextField, Avatar} from '@material-ui/core';
import {useState} from 'react';

import firebase from 'firebase/app';
import Loader from './Loader';

import {Context} from "../index";
import {useCollectionData} from "react-firebase-hooks/firestore";

function Chat() {
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [value, setValue] = useState('');
    const [messages, loading] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt')
    );


    const sendMessage = async () => {
        firestore.collection('messages').add({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setValue('');
    };
    console.log(messages)
    //
    if (loading) {
        return <Loader/>;
    }

    //
    function removeMes(id) {
        messages.map((f) => {
            if (f.uid !== id) {
                delete f.text
            } else {
                delete f.text
            }
        })
        console.log('23')
        return {...messages}

    }

//
    function timeSet(message) {
        const time = new Date(message.createdAt.seconds * 1000)
        const hours = time.getHours()
        const second = time.getMinutes()
        return <p>{hours + ':' + second}</p>

    }

    // function timeSet(message) {
    //     const time = new Date(message.createdAt.seconds * 1000)
    //     const hours = time.getHours()
    //     const second = time.getMinutes()
    //     console.log(hours + ':' + second)
    //
    // }

    return (

        <div>
            <Container>
                <Grid
                    container
                    justyfy={'center'}
                    style={{height: window.innerHeight - 50, marginTop: '5px'}}
                >
                    <div
                        style={{
                            width: '80%',
                            height: '70vh',
                            border: '1px solid gray',
                            overflowY: 'auto',
                        }}
                    >

                        {messages.map((message) => (

                            <div className="container" style={{
                                margin: '10px',

                                marginLeft: user.uid === message.uid ? 'auto' : '40px',
                                width: 'fit-content',
                                padding: '5px',
                            }}>
                                {/*<div className="message-blue">*/}
                                {/*    <p className="message-content">{message.text}</p>*/}
                                {/*    <div className="message-timestamp-left">SMS 13:37</div>*/}
                                {/*</div>*/}
                                    <div className={'boxImg'}>
                                    <Avatar src={message.photoURL} alt='avatar' className={'img'}/>
                                    </div>
                                <div className="message-orange">

                                    <p className="message-content">{message.text}</p>
                                    <div className="message-timestamp-right">{timeSet(message)}</div>
                                </div>

                                {/*<div className="message-blue">*/}
                                {/*    <p className="message-content">Thanks!</p>*/}
                                {/*    <div className="message-timestamp-left">SMS 13:37</div>*/}
                                {/*</div>*/}
                            </div>

                            // <div className={'fullBoxMes'} style={{
                            //     margin: '10px',
                            //
                            //     marginLeft: user.uid === message.uid ? 'auto' : '10px',
                            //     width: 'fit-content',
                            //     padding: '5px',
                            // }}>
                            //     <div className={'imgBox'} >
                            //         <Avatar src={message.photoURL} alt='avatar' className={'img'}/>
                            //     </div>
                            //
                            //     <div className={'boxMes'}>
                            //         <div className={'infoMesBox'}>
                            //             <h3>{message.displayName}</h3>
                            //             <p>{message.text}</p>
                            //         </div>
                            //         <div className={'timeMes'}>{timeSet(message)}</div>
                            //     </div>
                            // </div>

                            // <div
                            //     style={{
                            //         margin: '10px',
                            //         border:
                            //             user.uid === message.uid
                            //                 ? '2px solid green'
                            //                 : '2px dashed red',
                            //         marginLeft: user.uid === message.uid ? 'auto' : '10px',
                            //         width: 'fit-content',
                            //         padding: '5px',
                            //     }}
                            //     onClick={() => removeMes(user.uid)}
                            // >
                            //     <Grid container>
                            //         <Avatar src={message.photoURL}/>
                            //         <div>{message.displayName}</div>
                            //     </Grid>
                            //     <div>{message.text}</div>
                            //     <div>{}</div>
                            // </div>
                        ))}
                    </div>
                    <Grid
                        container
                        direction={'column'}
                        alignItems={'flex-end'}
                        style={{
                            width: '80%',
                        }}
                    >
                        <TextField
                            rowsMax={2}
                            variant={'outlined'}
                            fullWidth
                            value={value}
                            onChange={(e) => setValue(e.currentTarget.value)}
                        />
                        <Button onClick={sendMessage} variant={'outlined'}>
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Chat;
