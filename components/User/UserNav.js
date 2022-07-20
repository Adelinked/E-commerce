import { useState } from "react";
import styles from "./user.module.css";
import { useDispatch, useSelector } from "react-redux";
import { showUserLogin } from "../../store/actions/userAction";
import { useSession } from "next-auth/react";
import { FaUserPlus, FaUserAlt } from "react-icons/fa";
export const UserNav = (props) => {
  const { data: session } = useSession();
  let userName, userImg;
  if (session) {
    userName = session.user.name ?? session.user.email;
    userImg = session.user.image;
  }

  const dispatch = useDispatch();
  const { loggedIn, showLogin } = useSelector((state) => state.user);
  const openUserLogin = () => {
    //if (!session) {
    dispatch(showUserLogin(true));
    /* } else {
      signOut();
    }*/
  };
  return (
    <span
      className={styles.userIcon}
      onClick={openUserLogin}
      style={{ color: session && `var(--color-font)` }}
    >
      {!session ? (
        <span className={styles.loginTxt}>Login</span>
      ) : (
        <>
          <span className={styles.usr}>{userName}</span>
          <span className={styles.logouTxt}>Logout</span>
          <img
            className={styles.avatar}
            src={userImg ?? "/anonymous.png"}
          ></img>
        </>
      )}
      {!session ? (
        <FaUserPlus />
      ) : (
        <i className="fa fa-user" title={`Connected as ${userName}`}>
          <FaUserAlt />
        </i>
      )}
    </span>
  );
};
