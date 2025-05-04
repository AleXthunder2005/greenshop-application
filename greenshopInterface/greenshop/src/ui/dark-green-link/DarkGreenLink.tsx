import styles from './styles/style.module.css'

interface DarkGreenLinkProps 
{
    hrefValue: string,
    linkText: string
}

export function DarkGreenLink({hrefValue, linkText} : DarkGreenLinkProps) 
{
    return (
        <a className={styles['link']} href={hrefValue}>{linkText}</a>
    );
}