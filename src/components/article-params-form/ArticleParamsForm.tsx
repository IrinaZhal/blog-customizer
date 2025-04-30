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
	font: OptionType;
	fontSize: OptionType;
	fontColor: OptionType;
	bgColor: OptionType;
	width: OptionType;
	onClick?: (state: ArticleFormProps) => void;
};

export const ArticleParamsForm = (props: ArticleFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);

	const [font, setFont] = useState(props.font);
	const [fontSize, setFontSize] = useState(props.fontSize);
	const [fontColor, setFontColor] = useState(props.fontColor);
	const [bgColor, setBgColor] = useState(props.bgColor);
	const [width, setWidth] = useState(props.width);

	const toggleButton = () => {
		formUpdate();
		setIsOpen(isOpen ? false : true);
	};

	const handleSubmitClick = ({
		font,
		fontSize,
		fontColor,
		bgColor,
		width,
	}: ArticleFormProps) => {
		const state = { font, fontSize, fontColor, bgColor, width };
		props.onClick?.(state);
		event?.preventDefault();
		setIsOpen(false);
	};

	function formUpdate() {
		setFont(props.font);
		setFontSize(props.fontSize);
		setFontColor(props.fontColor);
		setBgColor(props.bgColor);
		setWidth(props.width);
	}

	const handleResetClick = () => {
		const newState = {
			font: defaultArticleState.fontFamilyOption,
			fontSize: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			bgColor: defaultArticleState.backgroundColor,
			width: defaultArticleState.contentWidth,
		};
		props.onClick?.(newState);
		setIsOpen(false);
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleButton} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='шрифт'
						selected={font}
						options={fontFamilyOptions}
						onChange={setFont}></Select>

					<RadioGroup
						name=''
						options={fontSizeOptions}
						selected={fontSize}
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
						selected={bgColor}
						options={backgroundColors}
						onChange={setBgColor}></Select>

					<Select
						title='Ширина контента'
						selected={width}
						options={contentWidthArr}
						onChange={setWidth}></Select>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => handleResetClick()}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={() =>
								handleSubmitClick({ font, fontSize, fontColor, bgColor, width })
							}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
