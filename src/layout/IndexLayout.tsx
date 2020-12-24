import React from 'react';
import styles from './IndexLayout.module.scss';
import { ReactComponent as Menu } from 'assets/icon/menu.svg';
import { ReactComponent as Search } from 'assets/icon/search.svg';
import { NavLink } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Player from 'components/Player';
import { useHistory } from 'react-router-dom';
export default (props) => {
  const { route } = props;
  const history = useHistory();
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span className={styles.icon}>
          <Menu />
        </span>
        <span>云音乐-busy</span>
        <span className={styles.icon}>
          <Search onClick={() => history.push('/search')} />
        </span>
      </div>
      <div className={styles.nav}>
        <div className={styles.navItem}>
          <NavLink to="/recommend" activeClassName={styles.active}>
            <span>推荐</span>
          </NavLink>
        </div>
        <div className={styles.navItem}>
          <NavLink to="/singers" activeClassName={styles.active}>
            <span>歌手</span>
          </NavLink>
        </div>
        <div className={styles.navItem}>
          <NavLink to="/rank" activeClassName={styles.active}>
            <span>排行榜</span>
          </NavLink>
        </div>
      </div>
      {renderRoutes(route.routes)}
      <Player />
    </div>
  );
};
