# IsAdmin

A wrapper component that only renders child components if the current user has admin capabilities. The use case for this component is when you have a certain setting that should be restricted to administrators only. For example when you have a block that requires an API token or credentials you might only want Administrators to edit these. See [10up/maps-block-apple](https://github.com/10up/maps-block-apple/blob/774c6509eabb7ac48dcebea551f32ac7ddc5d246/src/Settings/AuthenticationSettings.js) for a real world example.

## Usage

```js
import { IsAdmin } from '@10up/block-components';

function MyComponent( props ) {

    return (
        <IsAdmin
            fallback={ <p>Sorry, you are not allowed to do that</p> }
        >
            <p>Only Administrators can see what you put in here</p>
        </IsAdmin>
    )
}
```

### Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `fallback` | `ReactElement`    | `null`   | Element that will be rendered if the user is no admin          |
| `children` | `ReactElement(s)` | `'null'` | Child components that will be rendered if the user is an Admin |
