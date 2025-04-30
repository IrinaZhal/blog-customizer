import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import {
	ArticleParamsForm,
	ArticleFormProps,
} from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [state, setState] = useState({
		font: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		bgColor: defaultArticleState.backgroundColor,
		width: defaultArticleState.contentWidth,
	});

	const handleUpdate = (state: ArticleFormProps) => {
		setState({
			font: state.font,
			fontSize: state.fontSize,
			fontColor: state.fontColor,
			bgColor: state.bgColor,
			width: state.width,
		});
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': state.font.value,
					'--font-size': state.fontSize.value,
					'--font-color': state.fontColor.value,
					'--container-width': state.width.value,
					'--bg-color': state.bgColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				font={state.font}
				onClick={handleUpdate}
				fontSize={state.fontSize}
				fontColor={state.fontColor}
				bgColor={state.bgColor}
				width={state.width}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
