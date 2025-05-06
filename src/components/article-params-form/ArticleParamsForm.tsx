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
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { useRef, useState } from 'react';

export type ArticleFormProps = {
	fontFamilyOption: OptionType;
	fontSizeOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: {
	currentArticleState: ArticleFormProps;
	setCurrentArticleState: (newState: ArticleFormProps) => void;
}) => {
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);

	const [fontFamilyOption, setFont] = useState(
		currentArticleState.fontFamilyOption
	);
	const [fontSizeOption, setFontSize] = useState(
		currentArticleState.fontSizeOption
	);
	const [fontColor, setFontColor] = useState(currentArticleState.fontColor);
	const [backgroundColor, setBgColor] = useState(
		currentArticleState.backgroundColor
	);
	const [contentWidth, setWidth] = useState(currentArticleState.contentWidth);

	const toggleButton = () => {
		formUpdate();
		setIsFormOpen(isFormOpen ? false : true);
	};

	function formUpdate() {
		setFont(currentArticleState.fontFamilyOption);
		setFontSize(currentArticleState.fontSizeOption);
		setFontColor(currentArticleState.fontColor);
		setBgColor(currentArticleState.backgroundColor);
		setWidth(currentArticleState.contentWidth);
	}

	const handleSubmitClick = () => {
		setCurrentArticleState({
			fontFamilyOption,
			fontSizeOption,
			fontColor,
			backgroundColor,
			contentWidth,
		});
		event?.preventDefault();
		setIsFormOpen(false);
	};

	const handleResetClick = () => {
		setCurrentArticleState(defaultArticleState);
		event?.preventDefault();
		setIsFormOpen(false);
	};

	useOutsideClickClose({
		isOpen: isFormOpen,
		rootRef,
		onChange: setIsFormOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={toggleButton} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					onSubmit={handleSubmitClick}
					onReset={handleResetClick}
					className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='шрифт'
						selected={fontFamilyOption}
						options={fontFamilyOptions}
						onChange={setFont}></Select>

					<RadioGroup
						name='radio'
						options={fontSizeOptions}
						selected={fontSizeOption}
						onChange={setFontSize}
						title={'размер шрифта'}></RadioGroup>

					<Select
						title='Цвет шрифта'
						selected={fontColor}
						onChange={setFontColor}
						options={fontColors}></Select>

					<Separator></Separator>

					<Select
						title='Цвет фона'
						selected={backgroundColor}
						options={backgroundColors}
						onChange={setBgColor}></Select>

					<Select
						title='Ширина контента'
						selected={contentWidth}
						options={contentWidthArr}
						onChange={setWidth}></Select>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
