import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

export const ArticleParamsForm = () => {
	const defaultFont = defaultArticleState.fontFamilyOption;

	return (
		<>
			<ArrowButton isOpen={true} onClick={() => {}} />
			<aside className={clsx(styles.container, styles.container_open)}>
				<form className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='шрифт'
						selected={defaultFont}
						options={fontFamilyOptions}></Select>

					<RadioGroup
						name={'размер шрифта'}
						options={fontSizeOptions}
						selected={{
							title: '',
							value: '',
							className: '',
							optionClassName: undefined,
						}}
						title={''}></RadioGroup>
					<Select
						title='Цвет шрифта'
						selected={null}
						options={fontColors}></Select>
					<Separator></Separator>
					<Select
						title='Цвет фона'
						selected={null}
						options={backgroundColors}></Select>
					<Select
						title='Ширина контента'
						selected={null}
						options={contentWidthArr}></Select>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

/*

width: 362px;
height: 42px;

font-family: 'Open Sans';
font-style: normal;
font-weight: 800;
font-size: 31px;
line-height: 42px;
text-align: center;
text-transform: uppercase;

color: #000000;

flex: none;
order: 0;
flex-grow: 0;

*/
