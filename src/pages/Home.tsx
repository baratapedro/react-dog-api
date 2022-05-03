import { Autocomplete, TextField, Button, FormControl, RadioGroup, FormLabel, FormControlLabel, Radio, Backdrop, CircularProgress, Card, CardMedia } from '@mui/material';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Header, Images, Subbreed } from './styles';

interface Homeprops {
    message: string[],
    status: string
}

export function Home() {

    const [breeds, setBreeds] = useState<string[]>([])
    const [value, setValue] = useState<string | null>(null)
    const [currentImages, setCurrentImages] = useState<string[]>([])
    const [subBreeds, setSubBreeds] = useState<string[]>([])
    const [currentSubBreed, setCurrentSubBreed] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getBreedsList() {
            const breedList = await axios.get<Homeprops>('https://dog.ceo/api/breeds/list').then(response => response.data.message)
            setBreeds(breedList)
        }
        getBreedsList()

        async function getRandomBreedsImages() {
            const imageRandom = await axios.get<Homeprops>('https://dog.ceo/api/breeds/image/random/6').then(response => response.data.message)
            setCurrentImages(imageRandom)
            setLoading(false)
        }
        getRandomBreedsImages()
    }, [])

    async function handleSelectBreed() {
        setCurrentSubBreed('')
        if (value == null) {
            setLoading(true)
            const imageRandom = await axios.get<Homeprops>('https://dog.ceo/api/breeds/image/random/6').then(response => response.data.message)
            setCurrentImages(imageRandom)
            setSubBreeds([])
            setLoading(false)
        } else {
            setLoading(true)
            const selectedBreed = await axios.get<Homeprops>(`https://dog.ceo/api/breed/${value}/images/random/6`).then(response => response.data.message)
            setCurrentImages(selectedBreed)

            const selectedSubBreed = await axios.get<Homeprops>(`https://dog.ceo/api/breed/${value}/list`).then(response => response.data.message)
            setSubBreeds(selectedSubBreed)
            setLoading(false)
        }
    }

    async function handleShowCurrentBreedImages(selectedSubbreed: string) {       
        setLoading(true)
        const selectedBreedImages = await axios.get<Homeprops>(`https://dog.ceo/api/breed/${value}/${selectedSubbreed}/images/random/6`).then(response => response.data.message)
        setCurrentImages(selectedBreedImages)
        setCurrentSubBreed(selectedSubbreed)
        setLoading(false)
    }

    return (
        <>
            {loading ? (
                <>
                    <Header>
                        <h1>Dog API</h1>
                        <Autocomplete
                            disablePortal
                            options={breeds}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Breeds" />}
                            onChange={(event: any, newValue: string | null) => setValue(newValue)}
                            freeSolo
                        />
                        <Button variant="outlined" onClick={handleSelectBreed}>Search</Button>
                    </Header>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loading}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </>
            ) : (
                <>
                    <Header>
                        <h1>Dog API</h1>
                        <Autocomplete
                            disablePortal
                            options={breeds}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Breeds" />}
                            onChange={(event: any, newValue: string | null) => setValue(newValue)}
                            freeSolo
                        />
                        <Button variant="outlined" onClick={handleSelectBreed}>Search</Button>
                    </Header>

                    <Subbreed>
                        {subBreeds.length >= 1 ? <FormControl>
                            <FormLabel className='title'>Sub-breeds</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                row
                                className='subbreeds'
                            >
                                {
                                    subBreeds.map(subbreed =>
                                        subbreed == currentSubBreed ? <FormControlLabel value={subbreed} control={<Radio checked={true} />} label={subbreed} onClick={() => handleShowCurrentBreedImages(subbreed)} /> : <FormControlLabel value={subbreed} control={<Radio checked={false} />} label={subbreed} onClick={() => handleShowCurrentBreedImages(subbreed)} />
                                    )
                                }

                            </RadioGroup>
                        </FormControl> : ''}
                    </Subbreed>
                    <Images>
                        <>
                            {
                                currentImages.map(image => {
                                    return (<Card className="card">
                                        <CardMedia
                                            component="img"
                                            image={image}
                                            alt={currentSubBreed}
                                        />
                                    </Card>)
                                })
                            }
                        </>
                    </Images>
                </>
            )}

        </>
    )
}