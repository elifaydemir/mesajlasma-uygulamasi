import React, { useState, useEffect } from "react";
import {Grid, Segment,Form,Button, Message} from "semantic-ui-react";
import styles from "./login.module.css"
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import { useFirebase } from "react-redux-firebase";

const Login = () => {
    const firebase = useFirebase();
    const [fbErrors,setFbErrors] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const {register,errors,handleSubmit,setValue}=useForm();
    useEffect(()=> {
        register({name: "email"}, {required: true});
        register({name: "password"},{required: true, minLength: 6});
    },[]);
    const onSubmit = ({ email, password }) => {
        setSubmitting(true);
        setFbErrors([]);
        firebase.login({
            email, password
        })
            .then((data)=>{
                console.log(data);
            })
            .catch((error)=>{
                setFbErrors([{ message: error.message }]);

            })
            .finally(()=>{
                setSubmitting(false);
            })

    }
    const displayErrors = () =>
        fbErrors.map((error, index) => <p key={index}>{error.message}</p>);
    return (
        <Grid textAlign="center" verticalAlign="middle" className={styles.container}>
            <Grid.Column style={{maxWidth:450}}>
                <h1 className={styles.formHeader}>Develoveper
                <span>.io</span></h1>
                <Form size="large" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <Segment>
                        <Form.Input fluid icon="mail"
                                    iconPosition="left"
                                    name="email"
                                    placeholder="Email Adresi"
                                    onChange={(e, { name, value }) => {
                                        setValue(name, value);
                                    }}
                                    error={errors.email?true:false}
                        />
                        <Form.Input fluid icon="lock"
                                    iconPosition="left"
                                    name="password"
                                    placeholder="Şifre"
                                    type="password"
                                    onChange={(e, { name, value }) => {
                                        setValue(name, value);
                                    }}
                                    error={errors.password?true:false}

                        />
                        <Button color="purple" fluid size="large" disabled={submitting}>Giriş Yap</Button>
                    </Segment>
                </Form>
                {fbErrors.length > 0 && <Message error> {displayErrors()}</Message>}
                <Message>
                    Üye değil misin?<Link to="/signup"><a className={styles.messageLink} >Hesap Oluştur</a></Link>
                </Message>
            </Grid.Column>
        </Grid>
    );
};

export default Login;