port module Chat exposing (main)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



--
-- Model.
--


type Username
    = Username String


type alias Model =
    { input : String
    , jsUsername : Username
    , messages : List ( Username, String )
    }


init : String -> ( Model, Cmd Msg )
init jsUsername =
    ( { input = ""
      , jsUsername = Username jsUsername
      , messages = []
      }
    , Cmd.none
    )



--
-- Update.
--


type Msg
    = Input String
    | Send
    | NewJsMessage String


update : Msg -> Model -> ( Model, Cmd msg )
update msg model =
    case msg of
        Input text ->
            ( { model | input = text }, Cmd.none )

        Send ->
            ( { model
                | input = ""
                , messages = List.append model.messages [ ( Username "Elm says", model.input ) ]
              }
            , Cmd.none
            )

        NewJsMessage text ->
            ( { model
                | messages = List.append model.messages [ ( model.jsUsername, text ) ]
              }
            , Cmd.none
            )



--
-- Subscriptions.
--


port sendToElm : (String -> msg) -> Sub msg


subscriptions : Model -> Sub Msg
subscriptions model =
    sendToElm NewJsMessage



--
-- View.
--


view : Model -> Html Msg
view model =
    div [ class "chat-container" ]
        [ input
            [ class "elm-input"
            , attribute "data-test-elm-input" "true"
            , onInput Input
            , placeholder "Or from Elm"
            , value model.input
            ]
            []
        , button
            [ onClick Send
            , class "elm-send-btn"
            , attribute "data-test-elm-send-btn" "true"
            ]
            [ text "Send" ]
        , h2 [] [ Html.text "Messages" ]
        , div
            [ class "chat-messages" ]
            (case model.messages of
                [] ->
                    [ div
                        [ class "chat-message" ]
                        [ Html.text "no messages yet" ]
                    ]

                messages ->
                    List.indexedMap viewMessage messages
            )
        ]


viewMessage : Int -> ( Username, String ) -> Html msg
viewMessage index ( Username user, msg ) =
    div
        [ attribute "data-test-chat-message" (String.fromInt index)
        , class "chat-message"
        ]
        [ text (user ++ ": " ++ msg) ]
