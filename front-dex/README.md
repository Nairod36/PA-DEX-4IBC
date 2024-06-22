# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

```mermaid
%%{init: {"flowchart": {"htmlLabels": false}} }%%
flowchart TD
subgraph "`**Step 3 : Claim**`"
    subgraph Update_Rewards
    e("`**Storage**<br/>
  *liquidityA:* 2194<br/>
  *liquidityB:* 1823,15<br/>
  *totalFeesA:* 6<br/>
  *totalFeesB:* 0<br/>
  *userLiquidityA:* 1000<br/>
  *userLiquidityB:* 1000<br/>
  *userRewardsA:* 0<br/>
  *userRewardsB:* 0<br/>
  *userRewardsDebtA:* 0<br/>
  *userRewardsDebtA:* 0<br/>
  `") --> f("`**Storage**<br/>
  *liquidityA:* 2194<br/>
  *liquidityB:* 1823,15<br/>
  *totalFeesA:* 6<br/>
  *totalFeesB:* 0<br/>
  *userLiquidityA:* 1000<br/>
  *userLiquidityB:* 1000<br/>
  *userRewardsA:* 2,73<br/>
  *userRewardsB:* 0<br/>
  *userRewardsDebtA:* 6<br/>
  *userRewardsDebtA:* 0<br/>
  `")
    end

  g("`**Storage**<br/>
  *liquidityA:* 2194<br/>
  *liquidityB:* 1823,15<br/>
  *totalFeesA:* 6<br/>
  *totalFeesB:* 0<br/>
  *userLiquidityA:* 1000<br/>
  *userLiquidityB:* 1000<br/>
  *userRewardsA:* 0<br/>
  *userRewardsB:* 0<br/>
  *userRewardsDebtA:* 0<br/>
  *userRewardsDebtA:* 0<br/>
  `") -- "User1 Claim" --> Update_Rewards -- "Claim" --> h("`**Storage**<br/>
  *liquidityA:* 2194<br/>
  *liquidityB:* 1823,15<br/>
  *totalFeesA:* 6<br/>
  *totalFeesB:* 0<br/>
  *userLiquidityA:* 1000<br/>
  *userLiquidityB:* 1000<br/>
  *userRewardsA:* 0<br/>
  *userRewardsB:* 0<br/>
  *userRewardsDebtA:* 6<br/>
  *userRewardsDebtA:* 0<br/>
  `")
end
subgraph "`**Step 2 : Swap**`"
  c("`**Storage**<br/>
  *liquidityA:* 2000<br/>
  *liquidityB:* 2000<br/>
  *totalFeesA:* 0<br/>
  *totalFeesB:* 0<br/>
  *userLiquidityA:* 1000<br/>
  *userLiquidityB:* 1000<br/>
  *userRewardsA:* 0<br/>
  *userRewardsB:* 0<br/>
  *userRewardsDebtA:* 0<br/>
  *userRewardsDebtA:* 0<br/>
  `") -- "User2 swap 200 A" --> d("`**Storage**<br/>
  *liquidityA:* 2194<br/>
  *liquidityB:* 1823,15<br/>
  *totalFeesA:* 6<br/>
  *totalFeesB:* 0<br/>
  *userLiquidityA:* 1000<br/>
  *userLiquidityB:* 1000<br/>
  *userRewardsA:* 0<br/>
  *userRewardsB:* 0<br/>
  *userRewardsDebtA:* 0<br/>
  *userRewardsDebtA:* 0<br/>
  `")
end
subgraph "`**Step 1 : AddLiquidity**`"
  a("`**Storage**<br/>
  *liquidityA:* 1000<br/>
  *liquidityB:* 1000<br/>
  *totalFeesA:* 0<br/>
  *totalFeesB:* 0<br/>
  *userLiquidityA:* 0<br/>
  *userLiquidityB:* 0<br/>
  *userRewardsA:* 0<br/>
  *userRewardsB:* 0<br/>
  *userRewardsDebtA:* 0<br/>
  *userRewardsDebtA:* 0<br/>
  `") -- "User add 1000" --> b("`**Storage**<br/>
  *liquidityA:* 2000<br/>
  *liquidityB:* 2000<br/>
  *totalFeesA:* 0<br/>
  *totalFeesB:* 0<br/>
  *userLiquidityA:* 1000<br/>
  *userLiquidityB:* 1000<br/>
  *userRewardsA:* 0<br/>
  *userRewardsB:* 0<br/>
  *userRewardsDebtA:* 0<br/>
  *userRewardsDebtA:* 0<br/>
  `")
end
```
```mermaid
%%{init: {"flowchart": {"htmlLabels": false}} }%%
flowchart TD
subgraph "`**Step 2 : Add Liquidity**`"
    subgraph Update_Rewards1
    c("`**Storage**<br/>
  *liquidityA:* 1194<br/>
  *liquidityB:* 837,52<br/>
  *totalFeesA:* 6<br/>
  *totalFeesB:* 0<br/>
  *userLiquidityA:* 0<br/>
  *userLiquidityB:* 0<br/>
  *userRewardsA:* 0<br/>
  *userRewardsB:* 0<br/>
  *userRewardsDebtA:* 0<br/>
  *userRewardsDebtA:* 0<br/>
  `") --> d("`**Storage**<br/>
  *liquidityA:* 1194<br/>
  *liquidityB:* 837,52<br/>
  *totalFeesA:* 6<br/>
  *totalFeesB:* 0<br/>
  *userLiquidityA:* 0<br/>
  *userLiquidityB:* 0<br/>
  *userRewardsA:* 0<br/>
  *userRewardsB:* 0<br/>
  *userRewardsDebtA:* 6<br/>
  *userRewardsDebtA:* 0<br/>
  `")
    end

  e("`**Storage**<br/>
  *liquidityA:* 1194<br/>
  *liquidityB:* 837,52<br/>
  *totalFeesA:* 6<br/>
  *totalFeesB:* 0<br/>
  *userLiquidityA:* 0<br/>
  *userLiquidityB:* 0<br/>
  *userRewardsA:* 0<br/>
  *userRewardsB:* 0<br/>
  *userRewardsDebtA:* 0<br/>
  *userRewardsDebtA:* 0<br/>
  `") -- "User1 Claim" --> Update_Rewards1 -- "Claim" --> f("`**Storage**<br/>
  *liquidityA:* 2194<br/>
  *liquidityB:* 1837,52<br/>
  *totalFeesA:* 6<br/>
  *totalFeesB:* 0<br/>
  *userLiquidityA:* 1000<br/>
  *userLiquidityB:* 1000<br/>
  *userRewardsA:* 0<br/>
  *userRewardsB:* 0<br/>
  *userRewardsDebtA:* 6<br/>
  *userRewardsDebtA:* 0<br/>
  `")
end
subgraph "`**Step 1 : Swap**`"
  a("`**Storage**<br/>
  *liquidityA:* 1000<br/>
  *liquidityB:* 1000<br/>
  *totalFeesA:* 0<br/>
  *totalFeesB:* 0<br/>
  *userLiquidityA:* 0<br/>
  *userLiquidityB:* 0<br/>
  *userRewardsA:* 0<br/>
  *userRewardsB:* 0<br/>
  *userRewardsDebtA:* 0<br/>
  *userRewardsDebtA:* 0<br/>
  `") -- "User2 swap 200 A" --> b("`**Storage**<br/>
  *liquidityA:* 1194<br/>
  *liquidityB:* 837,52<br/>
  *totalFeesA:* 6<br/>
  *totalFeesB:* 0<br/>
  *userLiquidityA:* 0<br/>
  *userLiquidityB:* 0<br/>
  *userRewardsA:* 0<br/>
  *userRewardsB:* 0<br/>
  *userRewardsDebtA:* 0<br/>
  *userRewardsDebtA:* 0<br/>
  `")
end
```