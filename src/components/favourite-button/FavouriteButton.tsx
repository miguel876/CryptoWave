import { FC, useCallback, useEffect } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTranslation } from 'react-i18next';
import { PropTypes } from './favourite-button.types';
import { toast } from 'react-toastify';

export const FavouriteButton:FC<PropTypes> = ({ id, selectedCoins, setSelectedCoins }) => {
    const { t } = useTranslation();

    const handleButtonClick = useCallback(() => {
            setSelectedCoins(prevSelectedCoins => {
                if (prevSelectedCoins.includes(id)) {
                    return prevSelectedCoins.filter(coinId => coinId !== id);
                } else {
                    if (selectedCoins?.length < 5) { // Lock the favourites list
                        toast.success(t("messages.favouritesListSuccess"))
                        return [...prevSelectedCoins, id];
                    }
                    
                    toast.error(t("messages.favouritesListError"))
                    return prevSelectedCoins
                }
            });
        
    }, [id, selectedCoins?.length, setSelectedCoins, t]);

    useEffect(() => {
        localStorage.setItem('favouriteCoins', JSON.stringify(selectedCoins));
    }, [selectedCoins]);

    return (
        <Tooltip title={t('labels.favouritesMessage')} placement="right">
            <IconButton aria-label="favourite" size="small" onClick={handleButtonClick}>
                {selectedCoins.includes(id) ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon color="secondary" />}
            </IconButton>
        </Tooltip>
    );
};