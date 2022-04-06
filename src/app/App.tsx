import React from 'react';

import { Header } from 'features/Header/Header';

import './App.scss';

// import LoginModal from '../login-modal/login-modal';

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <main role="main" className="App">
        {/* <Routes>
          <Route path="/" component={Landing} exact />
          <Route path="/feed" component={Feed} />
          <Route path="/:categories/news" component={News} />
        </Routes>
        <Footer />
        <LoginModal /> */}
      </main>
    </>
  );
};

// class App extends React.Component<IProps, IState> {
//   componentDidMount() {
//     this.props.fetchCategories(-1);
//     this.props.fetchGameAssets();
//     sessionStorage.clear();
//   }

//   render() {
//     const { mode, isAppLoginModalShown, isAppNavShown } = this.props;

//     isAppLoginModalShown || isAppNavShown
//       ? document.body.classList.add('body--overflow-y-hidden')
//       : document.body.classList.remove('body--overflow-y-hidden');

//     this.setDocumentDatasetMode(mode);

//     return (
//       <main role="main" className="main">
//         <Header />
//         <Routes>
//           <Route path="/" component={Landing} exact />
//           <Route path="/feed" component={Feed} />
//           <Route path="/:categories/news" component={News} />
//         </Routes>
//         <Footer />
//         <LoginModal />
//       </main>
//     );
//   }

//   setDocumentDatasetMode(mode: APP_MODES) {
//     document.documentElement.dataset.appMode = mode;
//   }
// }

// const mapStateToProps = ({
//   mode,
//   isAppLoginModalShown,
//   isAppNavShown,
//   loggedAsAdmin,
// }: TAppState) => {
//   return { mode, isAppLoginModalShown, isAppNavShown, loggedAsAdmin };
// };

// const mapDispatchToProps = (
//   dispatch: AppDispatch,
//   { englishForKidsService }: { englishForKidsService: EnglishForKidsService },
// ) => {
//   return bindActionCreators(
//     {
//       fetchCategories: fetchCategories(englishForKidsService),
//       fetchGameAssets: fetchGameAssets(englishForKidsService),
//     },
//     dispatch,
//   );
// };

// export default compose(
//   withEnglishForKidsService(),
//   connect(mapStateToProps, mapDispatchToProps),
// )(App);
