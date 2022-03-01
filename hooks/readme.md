# Hooks

## useHasSelectedInnerBlock

Determine whether one of the inner blocks currently is selected.

### Usage

```js
import { useHasSelectedInnerBlock } from '@10up/block-components';

function BlockEdit( props ) {
    const hasSelectedInnerBlock = useHasSelectedInnerBlock(props);

    return (
        <div>
            { hasSelectedInnerBlock ? 'InnerBlocks are selected' : 'InnerBlocks are not selected' }
        </div>
    )
}
```

## useRequestData

Custom hook to to make a request using `getEntityRecords` or `getEntityRecord` that provides `data`, `isLoading` and `invalidator` function. The hook determines which selector to use based on the query parameter. If a number is passed, it will use `getEntityRecord` to retrieve a single item. If an object is passed, it will use that as the query for `getEntityRecords` to retrieve multiple pieces of data.

The `invalidator` function, when dispatched, will tell the datastore to invalidate the resolver associated with the request made by getEntityRecords. This will trigger the request to be re-run as if it was being requested for the first time. This is not always needed but is very useful for components that need to update the data after an event. For example, displaying a list of uploaded media after a new item has been uploaded.

Parameters:

* `{string}` entity The entity to retrieve. ie. postType
* `{string}` kind   The entity kind to retrieve. ie. posts
* `{Object|Number}` Optional. Query to pass to the geEntityRecords request. Defaults to an empty object. If a number is passed, it is used as the ID of the entity to retrieve via getEntityRecord.

Returns:

* `{Array}`
  * `{Array}`   Array containing the requested entity kind.
  * `{Boolean}`  Representing if the request is resolving
  * `{Function}` This function will invalidate the resolver and re-run the query.

### Usage

#### Multiple pieces of data

```js
const ExampleBockEdit = ({ className }) => {
 const [data, isLoading, invalidateRequest ] = useRequestData('postType', 'post', { per_page: 5 });

 if (isLoading) {
  return <h3>Loading...</h3>;
 }
 return (
  <div className={className}>
   <ul>
    {data &&
     data.map(({ title: { rendered: postTitle } }) => {
      return <li>{postTitle}</li>;
     })}
   </ul>
   <button type="button" onClick={invalidateRequest}>
    Refresh list
   </button>
  </div>
 );
};
```

#### Single piece of data

```js
const ExampleBockEdit = ({ className }) => {
 const [data, isLoading, invalidateRequest ] = useRequestData('postType', 'post', 59);

 if (isLoading) {
  return <h3>Loading...</h3>;
 }
 return (
  <div className={className}>

    {data &&( <div>{data.title.rendered}</div>)}

   <button type="button" onClick={invalidateRequest}>
    Refresh list
   </button>
  </div>
 );
};
```
