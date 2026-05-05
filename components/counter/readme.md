# Counter

The `Counter` component let's you use circular progress bar with two props - `count` and `limit`.

This also exposes another component named `CircularProgressBar`, which can be used when we don't want the text annotation and just the SVG illustration.

## Usage

```js
import { Counter, CircularProgressBar } from '@10up/block-components';

function MyComponent( props ) {

    return (
		<>
			<Counter
				count={text.length}
				limit={20}
			/>

			<CircularProgressBar
				percentage={(text.length / 20) * 100}
			/>
		</>
    );
}
```

## Props

#### Counter

| Name             | Type       | Default   | isRequired     | Description                                                            |
| ---------------- | ---------- | ---------- | --------------------- | ---------------------------------------------------------------------- |
| `count`   | `number` | -            | `Yes` |  Current count of the counter. |
| `limit`          | `number`   | -                   | `Yes` | Max limit of the counter.                           |

#### CircularProgressBar

| Name             | Type       | Default   | isRequired     | Description                                                            |
| ---------------- | ---------- | ---------- | --------------------- | ---------------------------------------------------------------------- |
| `percentage`   | `number` | -            | `Yes` |  Elapsed percentage of the timer. |
